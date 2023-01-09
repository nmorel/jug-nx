package com.github.nmorel.nxpolyglot.entities;

import java.util.Objects;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.Instant;

@Entity
@Table(name = "todos")
public class Todo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String description;

    private Boolean complete;

    private Instant createdAt;

    private Instant updatedAt;

    Todo() {
    }

    Todo(String description) {
        this.description = description;
        this.complete = false;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public Long getId() {
        return this.id;
    }

    public String getDescription() {
        return this.description;
    }

    public Boolean isComplete() {
        return this.complete;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public Instant getUpdatedAt() {
        return this.updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setComplete(Boolean complete) {
        this.complete = complete;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Todo)) {
            return false;
        }
        Todo todo = (Todo) o;
        return Objects.equals(this.id, todo.id) && Objects.equals(this.description, todo.description)
                && Objects.equals(this.complete, todo.complete) && Objects.equals(this.createdAt, todo.createdAt)
                && Objects.equals(this.updatedAt, todo.updatedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.description, this.complete, this.createdAt, this.updatedAt);
    }

    @Override
    public String toString() {
        return String.format("TodoItem{id=%d, description='%s', complete='%s', createdAt='%s', updatedAt='%s'}",
                this.id, this.description, this.complete, this.createdAt, this.updatedAt);
    }
}
