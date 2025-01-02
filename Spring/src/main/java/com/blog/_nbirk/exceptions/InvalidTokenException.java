package com.blog._nbirk.exceptions;

import com.blog._nbirk.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(){
        super(Messages.getMessageForLocale("nbirk.activate.user.invalid.token", LocaleContextHolder.getLocale()));
    }
}
