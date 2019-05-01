import copy
import numpy
import collections
import sys
from enum import Enum

negative = 'false'
change = '0'
with open('Trees.txt', 'r') as myfile:
    data = myfile.read().replace('\n', '|')
w = 0
for c in data:
    if c == '|':
        w = w + 1
data1 = [[0 for x in range(w + 1)] for y in range(w + 1)]
x = 0
y = 0
successor = 0
myLen = 0
minus = 1
for c in data:
    myLen = myLen + 1
counter = 0
num = ""
for counter in range(0, myLen):
    c = data[counter]
    if c == ' ':
        data1[x][y] = int(num) * minus
        num = ""
        counter = counter + 1
        y = y + 1
        minus = 1
        continue
    if c == '|':
        data1[x][y] = int(num) * minus
        num = ""
        x = x + 1
        y = 0
        counter = counter + 1
        minus = 1
        continue
    if c == '-':
        if counter + 1 == myLen:
            data1[i][j] = pow(2, 31)
            num = ""
            counter = counter + 1
            y = y + 1
            minus = 1
            continue
        else:
            if data[counter + 1] == ' ' or data[counter + 1] == '|':
                num = str(pow(2, 31))
                minus = 1
                counter = counter + 1
                continue
        minus = -1
        negative = 'true'
        counter = counter + 1
        continue
    else:
        num = num + c
        counter = counter + 1


class COLOR(Enum):
    WHITE = 1,
    GRAY = 2,
    BLACcounter = 3


class Edge:
    def __init__(this, predcessor=0, successor=0):
        this.predcessor = predcessor
        this.successor = successor


class Vertex:
    def __init__(this, d=0):
        this.d = d
        this.f = 0
        this.parent = -1
        this.color = COLOR.WHITE


WHITE = COLOR.WHITE
GRAY = COLOR.GRAY
BLACcounter = COLOR.BLACcounter


class Graph:
    def __init__(this, V=1):
        this.V = V  # the number of the nodes in Graph
        this.nvertices_originally_connected = 0
        this.root_vertex = 0
        this.Edges = [[] for i in range(this.V)]
        this.time = 0
        this.vertex = [Vertex() for i in range(V)]
        this.visitedEdge = []

    def vertexOfThis(this, ind):
        for i in range(len(this.Edges)):
            for j in range(len(this.Edges[i])):
                if this.Edges[i][j] == ind:
                    return 1
        return 0

    def removeGraphEdge(this, predcessor, successor):
        this.Edges[predcessor].remove(successor)

    def addGraphEdge(this, predcessor, successor):
        this.Edges[predcessor].append(successor)

    def printGraph(this):
        vi = []
        sx = 0
        for i in range(len(this.Edges)):
            for j in range(len(this.Edges[i])):
                print(f"({i + 1}, {this.Edges[i][j] + 1})", end="")

    def DFS_Visit(this, u):
        this.vertex[u].color = GRAY
        this.time = this.time + 1
        this.vertex[u].d = this.time

        for i in range(len(this.Edges[u])):
            if this.vertex[this.Edges[u][i]].color == WHITE:
                this.vertex[this.Edges[u][i]].parent = u
                this.DFS_Visit(this.Edges[u][i])

        this.vertex[u].color = BLACcounter
        this.time = this.time + 1
        this.vertex[u].f = this.time

    def getNconnectedvertices(this):
        Nconnected = 0
        tally = [0 for i in range(this.V)]
        for i in range(this.V):
            if len(this.Edges[i]) > 0:
                tally[i] = tally[i] + 1
        for i in range(len(this.Edges)):
            for j in range(len(this.Edges[i])):
                tally[this.Edges[i][j]] = tally[this.Edges[i][j]] + 1
        for i in range(len(tally)):
            if tally[i] > 0:
                Nconnected = Nconnected + 1
        return Nconnected


def matrix_to_list(matrix):
    Graph = {}
    for i, node in enumerate(matrix):
        adj = []
        for j, connected in enumerate(node):
            if connected != 0:
                adj.append(j)
        Graph[i] = adj
    return Graph


def GrowTree():
    global V
    global T
    global L
    global spanningTreeIdNumber
    global G
    global F
    if T.getNconnectedvertices() == V:
        L = copy.deepcopy(T)
        spanningTreeIdNumber = spanningTreeIdNumber + 1
        print("")
        print(f"\nKrawedzie drzewa {spanningTreeIdNumber}: \n", end="")
        L.visitedEdge = []
        L.printGraph()
        L.DFS_Visit(L.root_vertex)
    else:
        FF = []
        while True:
            if len(F) > 0:
                e = F.pop(0)
            else:
                return 0
            v = e.successor
            T.addGraphEdge(e.predcessor, v)
            Fcopy = []
            Fcopy = copy.deepcopy(F)

            # adding an Edge to F
            for i in range(len(G.Edges[v])):
                w = G.Edges[v][i]
                if T.vertexOfThis(w) != 1:
                    F.insert(0, Edge(v, w))

            # deleting the Edge from F
            for iw in range(len(G.Edges)):
                atemp = T.vertexOfThis(iw)
                if T.vertexOfThis(iw):
                    jtmp = []
                    for j in range(len(G.Edges[iw])):
                        if G.Edges[iw][j] == v:
                            jtmp.append(j)
                    if len(jtmp) > 0:
                        # F.remove(Edge(iw,v))
                        iFtemp = []
                        for iF in range(len(F)):
                            if F[iF].predcessor == iw and F[iF].successor == v:
                                iFtemp.append(iF)
                        if len(iFtemp) > 0:
                            for df in range(len(iFtemp) - 1, -1, -1):
                                F.pop(iFtemp[df])

            GrowTree()
            F = copy.deepcopy(Fcopy)
            T.removeGraphEdge(e.predcessor, e.successor)
            G.removeGraphEdge(e.predcessor, e.successor)
            FF.insert(0, e)

            b = 1
            for w in range(len(G.Edges)):
                tempjj = -1
                for jj in range(len(G.Edges[w])):
                    if G.Edges[w][jj] == v:
                        tempjj = jj
                if tempjj != -1:
                    if ((L.vertex[v].d < L.vertex[w].d) and (L.vertex[w].d < L.vertex[w].f) and (
                            L.vertex[w].f < L.vertex[v].f)) == 0:
                        b = 0
                        break
            if b == 1:
                break

        while True:
            if (len(FF) > 0):
                e1 = FF.pop(0)
                F.insert(0, e1)
                G.addGraphEdge(e1.predcessor, e1.successor)
            else:
                break;


V = 0
for i in data1:
    V = V + 1
T = Graph(V)
L = Graph(V)
T.root_vertex = 0
L.root_vertex = 0
spanningTreeIdNumber = 0
F = []
vertices = matrix_to_list(data1)
# initial Graph G
G = Graph(V)
G.root_vertex = 0
numI = 0
numJ = 0
print(f"\n$-------------------------------------------------------------------------$\n")
print(vertices)
for i in vertices:
    for j in vertices[i]:
        G.addGraphEdge(i, j)
G.printGraph()
for i in range(len(G.Edges[G.root_vertex])):
    F.insert(0, Edge(G.root_vertex, G.Edges[G.root_vertex][i]))
GrowTree()
