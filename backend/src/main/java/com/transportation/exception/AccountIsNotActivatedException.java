package com.transportation.exception;

public class AccountIsNotActivatedException extends RuntimeException {
    public AccountIsNotActivatedException() {
        super("Account not activated");
    }

    public AccountIsNotActivatedException(String message) {
        super(message);
    }

    public AccountIsNotActivatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public AccountIsNotActivatedException(Throwable cause) {
        super(cause);
    }

    protected AccountIsNotActivatedException(String message, Throwable cause,
                                             boolean enableSuppression,
                                             boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
