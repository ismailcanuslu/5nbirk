package com.blog._nbirk.exceptions;

import com.blog._nbirk.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Collections;
import java.util.Map;

public class NotUniqueEmailException extends RuntimeException {
    public NotUniqueEmailException(){
        super(Messages.getMessageForLocale("nbirk.error.validation", LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors(){
        return Collections.singletonMap("email",Messages.getMessageForLocale("nbirk.constraint.email.notunique", LocaleContextHolder.getLocale()));
    }
}
