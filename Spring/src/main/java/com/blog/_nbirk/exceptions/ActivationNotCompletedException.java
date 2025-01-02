package com.blog._nbirk.exceptions;

import com.blog._nbirk.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class ActivationNotCompletedException extends RuntimeException {
    public ActivationNotCompletedException(){
        super(Messages.getMessageForLocale("nbirk.user.email.activation.failure", LocaleContextHolder.getLocale()));
    }
}
