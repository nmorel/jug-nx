package com.github.nmorel.nxpolyglot.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SinglePageAppController {

    @RequestMapping(value = { "/", "/todos/**" })
    public String index() {
        return "/index.html";
    }
}
