package com.github.nmorel.nxpolyglot.repositories;

import com.github.nmorel.nxpolyglot.entities.Todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    public List<Todo> findAllByOrderByCompleteAscCreatedAtDesc();
}
