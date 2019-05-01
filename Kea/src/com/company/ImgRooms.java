package com.company;

import java.util.Scanner;

class ImgRooms {

    public static void main(String args[]) {

        Scanner scanner = new Scanner(System.in);

        int d;
        int n;
        int[] images;
        int[] people;
        int counter = 0;

        d = scanner.nextInt();

        for (int sets = 0; sets < d; sets++) {
            n = scanner.nextInt();

            images = new int[n];
            people = new int[n];

            for (int i = 0; i < n; i++) {
                images[i] = scanner.nextInt();
                people[i] = 1;
            }

            do {
                counter = n - countEmpty(people);
                for (int i = 0; i < n; i++) {
                    if (people[i] != 0) {
                        people[images[i] - 1]++;
                        people[i]--;
                    }
                }
                for (int i = 0; i < n; i++) {
                    if (people[i] != 0) {
                        people[images[i] - 1]++;
                        people[i]--;
                    }
                }
            }
            while (n - countEmpty(people) != counter);
            System.out.println(n - countEmpty(people));

        }


    }

    static int countEmpty(int[] entry) {
        int c = 0;
        for (int i = 0; i < entry.length; i++) {
            if (entry[i] == 0)
                c++;
        }
        return c;
    }
}
