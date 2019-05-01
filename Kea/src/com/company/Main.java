package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int d;
        int n;
        int[][] table;
        int result = 0;

        d = scanner.nextInt();

        for (int z = 0; z < d; z++) {

            n = scanner.nextInt();
            table = new int[n][n];

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    table[i][j] = scanner.nextInt();
                }
            }

            for (int k = 0; k < n; k++) {
                if (table[k][k] == 1) {
                    for (int x = 0; x < n; x++) {
                        if ((table[k][x] == 1 && table[x][k] == 1)) {
                            continue;
                        }
                        result = k + 1;
                    }
                }
            }
            System.out.print(result);
        }
    }
}
