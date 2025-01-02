package com.blog._nbirk.configuration;

import java.beans.PropertyEditorSupport;

public class RoleEditor extends PropertyEditorSupport {
    @Override
    public void setAsText(String text) {
        setValue(UserRole.valueOf(text.toUpperCase()));
    }
}
