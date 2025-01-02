package com.blog._nbirk.exceptions;

import com.blog._nbirk.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(){
        super(Messages.getMessageForLocale("nbirk.user.login.auth.error", LocaleContextHolder.getLocale()));
    }
}
