import {
  ProjectGraph,
  ProjectGraphBuilder,
  ProjectGraphProjectNode,
  ProjectGraphProcessorContext,
  workspaceRoot,
} from '@nrwl/devkit'
import {join} from 'path'
import {existsSync, readFileSync} from 'fs'
import {XMLParser} from 'fast-xml-parser'

type PomArtifact = {
  groupId: string
  artifactId: string
}

type PomProject = PomArtifact & {
  parent: PomArtifact
  dependencies: {
    dependency: PomArtifact | PomArtifact[]
  }
}

type PomXml = {
  project: PomProject
}

export function processProjectGraph(
  graph: ProjectGraph,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: ProjectGraphProcessorContext
): ProjectGraph {
  const builder = new ProjectGraphBuilder(graph)

  const projects = getManagedProjects(builder.graph.nodes)

  for (const project of projects) {
    if (!project.pom.dependencies?.dependency) continue

    builder.addExplicitDependency(
      project.project.name,
      join(project.project.data.root, 'pom.xml').replace(/\\/g, '/'),
      '@back/parent-pom'
    )

    if (Array.isArray(project.pom.dependencies.dependency)) {
      project.pom.dependencies.dependency.forEach((dep) => {
        addProjectDependency(project, dep, projects, builder)
      })
    } else {
      addProjectDependency(project, project.pom.dependencies.dependency, projects, builder)
    }
  }

  return builder.getUpdatedProjectGraph()
}

function addProjectDependency(
  {project, pom}: ReturnType<typeof getManagedProjects>[0],
  dependency: PomArtifact,
  projects: ReturnType<typeof getManagedProjects>,
  builder: ProjectGraphBuilder
) {
  if (pom.groupId === pom.parent.groupId && pom.groupId === dependency.groupId) {
    const targetProject = projects.find(
      ({pom}) => pom.groupId === dependency.groupId && pom.artifactId === dependency.artifactId
    )
    if (targetProject) {
      builder.addExplicitDependency(
        project.name,
        join(project.data.root, 'pom.xml').replace(/\\/g, '/'),
        targetProject.project.name
      )
    }
  }
}

function isDefined<T>(arg: T | null): arg is T {
  return !!arg
}

function getManagedProjects(nodes: Record<string, ProjectGraphProjectNode>) {
  return Object.entries(nodes)
    .map((node) => getManagedProject(node[1]))
    .filter(isDefined)
}

function getManagedProject(projectGraphNode: ProjectGraphProjectNode) {
  const root = projectGraphNode.data.root
  const pomXmlPath = join(workspaceRoot, root, 'pom.xml')
  if (!existsSync(pomXmlPath)) {
    return null
  }

  const pomXmlData = readFileSync(pomXmlPath)
  const parser = new XMLParser()
  const pomXmlContent = parser.parse(pomXmlData) as PomXml

  return {
    project: projectGraphNode,
    pomXmlPath,
    pom: pomXmlContent.project,
  }
}
