package com.blog._nbirk.exceptions;

import com.blog._nbirk.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class NotFoundException extends RuntimeException{
    public NotFoundException(long id) {
        super(Messages.getMessageForLocale("nbirk.user.not.found", LocaleContextHolder.getLocale()));
    }
    public NotFoundException(String id) {
        super(Messages.getMessageForLocale("nbirk.user.not.found", LocaleContextHolder.getLocale()));
    }
}
