package com.marbleUs.marbleUs.common;

import org.hibernate.Hibernate;
import java.util.Objects;

public class BaseEntity {
    private Long id;

    // Getter and setter for id

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
            return false;

        BaseEntity that = (BaseEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
