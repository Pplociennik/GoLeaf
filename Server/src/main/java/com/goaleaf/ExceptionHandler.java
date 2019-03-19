package com.goaleaf;

public class ExceptionHandler implements Thread.UncaughtExceptionHandler {

    public void uncaughtException(Thread t, Throwable e) {
        System.out.println("Where did that error come from?!");
        System.out.println("This is where I would report the error to ErrorStack");
        System.out.println(e.getMessage());
        System.out.println(t.toString());
    }

}
