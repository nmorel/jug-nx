package com.github.nmorel.nxpolyglot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import com.github.nmorel.nxpolyglot.services.TodoService;
import com.github.nmorel.nxpolyglot.exceptions.TodoNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.github.nmorel.nxpolyglot.entities.Todo;

@RestController
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/api/todos")
    Iterable<Todo> getAll() {
        return this.todoService.getAll();
    }

    @PostMapping("/api/todos")
    public Todo createTodo(@RequestBody Todo todo) {
        return this.todoService.save(todo);
    }

    @GetMapping("/api/todos/{id}")
    public Todo getTodo(@PathVariable Long id) {
        return this.todoService.getById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    @PutMapping("/api/todos/{id}")
    public Todo updateTodo(@RequestBody Todo newTodo, @PathVariable Long id) {
        return this.todoService.getById(id)
                .map(todo -> {
                    todo.setDescription(newTodo.getDescription());
                    todo.setComplete(newTodo.isComplete());
                    return this.todoService.save(todo);
                })
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    @DeleteMapping("/api/todos/{id}")
    public void deleteTodo(@PathVariable Long id) {
        this.todoService.delete(id);
    }
}
