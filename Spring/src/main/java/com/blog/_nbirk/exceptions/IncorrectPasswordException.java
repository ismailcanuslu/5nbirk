package com.blog._nbirk.exceptions;

import com.blog._nbirk.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class IncorrectPasswordException extends RuntimeException {
    public IncorrectPasswordException(){
        super(Messages.getMessageForLocale("nbirk.validation.password.invalid", LocaleContextHolder.getLocale()));

    }
}
