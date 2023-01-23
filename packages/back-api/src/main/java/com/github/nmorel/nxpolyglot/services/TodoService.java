package com.github.nmorel.nxpolyglot.services;

import com.github.nmorel.nxpolyglot.entities.Todo;
import com.github.nmorel.nxpolyglot.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoItemRepository;

    public Optional<Todo> getById(Long id) {
        return todoItemRepository.findById(id);
    }

    public Iterable<Todo> getAll() {
        return todoItemRepository.findAllByOrderByCompleteAscCreatedAtDesc();
    }

    public Todo save(Todo todo) {
        if (todo.getId() == null) {
            todo.setCreatedAt(Instant.now());
        }
        todo.setUpdatedAt(Instant.now());
        return todoItemRepository.save(todo);
    }

    public void delete(Long id) {
        todoItemRepository.deleteById(id);
    }

}
