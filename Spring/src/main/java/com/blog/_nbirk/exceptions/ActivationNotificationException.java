package com.blog._nbirk.exceptions;

import com.blog._nbirk.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class ActivationNotificationException extends RuntimeException {
    public ActivationNotificationException(){
        super(Messages.getMessageForLocale("nbirk.create.user.email.failure", LocaleContextHolder.getLocale()));
    }
}
