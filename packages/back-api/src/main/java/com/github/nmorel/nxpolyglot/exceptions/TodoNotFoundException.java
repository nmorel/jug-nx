package com.github.nmorel.nxpolyglot.exceptions;

public class TodoNotFoundException extends RuntimeException {

    public TodoNotFoundException(Long id) {
        super("Could not find todo " + id);
    }
}
