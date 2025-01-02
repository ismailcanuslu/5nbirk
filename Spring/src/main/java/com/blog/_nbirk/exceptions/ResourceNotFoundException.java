package com.blog._nbirk.exceptions;

import com.blog._nbirk.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(){
        super(Messages.getMessageForLocale("5nbirk.posts.not.found", LocaleContextHolder.getLocale()));
    }
}
