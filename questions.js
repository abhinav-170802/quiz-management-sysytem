var questions = {
    Beginner: [
        [
            { q: "What is the time complexity of pushing an element to a stack?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 0 },
            { q: "Which data structure operates on a Last-In-First-Out (LIFO) basis?", options: ["Queue", "Tree", "Stack", "Graph"], answer: 2 },
            { q: "What does a standard array store?", options: ["Multiple data types randomly", "Elements of the same data type sequentially", "Key-value pairs", "Nodes linked by pointers"], answer: 1 },
            { q: "What is the best case time complexity for linear search?", options: ["O(log n)", "O(1)", "O(n)", "O(n^2)"], answer: 1 },
            { q: "Which of the following is an example of a dynamic data structure?", options: ["Array", "Linked List", "String", "Boolean"], answer: 1 },
            { q: "What is the primary advantage of a linked list over an array?", options: ["Random access", "Memory efficiency", "Easy insertion and deletion", "Sorting speed"], answer: 2 },
            { q: "What does 'FIFO' stand for?", options: ["Fast-In-Fast-Out", "First-In-First-Out", "Fixed-Input-Fixed-Output", "First-In-Fixed-Out"], answer: 1 },
            { q: "Which operation removes an element from a stack?", options: ["Push", "Pop", "Enqueue", "Dequeue"], answer: 1 },
            { q: "What is a queue?", options: ["A linear data structure based on FIFO", "A hierarchical data structure", "A database table", "A sorting algorithm"], answer: 0 },
            { q: "The process of accessing each element in an array is called:", options: ["Sorting", "Merging", "Traversal", "Insertion"], answer: 2 }
        ],
        [
            { q: "How do you access the first element of an array?", options: ["arr[1]", "arr[0]", "arr.first()", "arr.start()"], answer: 1 },
            { q: "Which operation is used to add an item to the end of a queue?", options: ["Push", "Pop", "Enqueue", "Dequeue"], answer: 2 },
            { q: "What does a node in a singly linked list contain?", options: ["Data and two pointers", "Only data", "Data and a pointer to the next node", "Multiple data values"], answer: 2 },
            { q: "What is the time complexity to insert an element at the beginning of an array?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 1 },
            { q: "Which of these is a non-linear data structure?", options: ["Array", "Linked List", "Tree", "Stack"], answer: 2 },
            { q: "What is recursion?", options: ["A loop that never ends", "A function calling another function", "A function calling itself", "An iterative process"], answer: 2 },
            { q: "What is the space complexity of an array of size n?", options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"], answer: 1 },
            { q: "Which search relies on the array being sorted?", options: ["Linear Search", "Binary Search", "Hash Search", "Breadth First Search"], answer: 1 },
            { q: "If you pop an empty stack, what is it called?", options: ["Overflow", "Underflow", "Crash", "Garbage Collection"], answer: 1 },
            { q: "Which is a characteristic of an array?", options: ["Dynamic size", "Contiguous memory allocation", "Key-Value pairs", "Nodes and pointers"], answer: 1 }
        ],
        [
            { q: "What is the time complexity of pushing an element to a stack?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 0 },
            { q: "Which data structure operates on a Last-In-First-Out (LIFO) basis?", options: ["Queue", "Tree", "Stack", "Graph"], answer: 2 },
            { q: "What does a standard array store?", options: ["Multiple data types randomly", "Elements of the same data type sequentially", "Key-value pairs", "Nodes linked by pointers"], answer: 1 },
            { q: "What is the best case time complexity for linear search?", options: ["O(log n)", "O(1)", "O(n)", "O(n^2)"], answer: 1 },
            { q: "Which of the following is an example of a dynamic data structure?", options: ["Array", "Linked List", "String", "Boolean"], answer: 1 },
            { q: "What is the primary advantage of a linked list over an array?", options: ["Random access", "Memory efficiency", "Easy insertion and deletion", "Sorting speed"], answer: 2 },
            { q: "What does 'FIFO' stand for?", options: ["Fast-In-Fast-Out", "First-In-First-Out", "Fixed-Input-Fixed-Output", "First-In-Fixed-Out"], answer: 1 },
            { q: "Which operation removes an element from a stack?", options: ["Push", "Pop", "Enqueue", "Dequeue"], answer: 1 },
            { q: "What is a queue?", options: ["A linear data structure based on FIFO", "A hierarchical data structure", "A database table", "A sorting algorithm"], answer: 0 },
            { q: "The process of accessing each element in an array is called:", options: ["Sorting", "Merging", "Traversal", "Insertion"], answer: 2 }
        ],
        [
            { q: "How do you access the first element of an array?", options: ["arr[1]", "arr[0]", "arr.first()", "arr.start()"], answer: 1 },
            { q: "Which operation is used to add an item to the end of a queue?", options: ["Push", "Pop", "Enqueue", "Dequeue"], answer: 2 },
            { q: "What does a node in a singly linked list contain?", options: ["Data and two pointers", "Only data", "Data and a pointer to the next node", "Multiple data values"], answer: 2 },
            { q: "What is the time complexity to insert an element at the beginning of an array?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 1 },
            { q: "Which of these is a non-linear data structure?", options: ["Array", "Linked List", "Tree", "Stack"], answer: 2 },
            { q: "What is recursion?", options: ["A loop that never ends", "A function calling another function", "A function calling itself", "An iterative process"], answer: 2 },
            { q: "What is the space complexity of an array of size n?", options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"], answer: 1 },
            { q: "Which search relies on the array being sorted?", options: ["Linear Search", "Binary Search", "Hash Search", "Breadth First Search"], answer: 1 },
            { q: "If you pop an empty stack, what is it called?", options: ["Overflow", "Underflow", "Crash", "Garbage Collection"], answer: 1 },
            { q: "Which is a characteristic of an array?", options: ["Dynamic size", "Contiguous memory allocation", "Key-Value pairs", "Nodes and pointers"], answer: 1 }
        ],
        [
            { q: "What is the time complexity of pushing an element to a stack?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 0 },
            { q: "Which data structure operates on a Last-In-First-Out (LIFO) basis?", options: ["Queue", "Tree", "Stack", "Graph"], answer: 2 },
            { q: "What does a standard array store?", options: ["Multiple data types randomly", "Elements of the same data type sequentially", "Key-value pairs", "Nodes linked by pointers"], answer: 1 },
            { q: "What is the best case time complexity for linear search?", options: ["O(log n)", "O(1)", "O(n)", "O(n^2)"], answer: 1 },
            { q: "Which of the following is an example of a dynamic data structure?", options: ["Array", "Linked List", "String", "Boolean"], answer: 1 },
            { q: "What is the primary advantage of a linked list over an array?", options: ["Random access", "Memory efficiency", "Easy insertion and deletion", "Sorting speed"], answer: 2 },
            { q: "What does 'FIFO' stand for?", options: ["Fast-In-Fast-Out", "First-In-First-Out", "Fixed-Input-Fixed-Output", "First-In-Fixed-Out"], answer: 1 },
            { q: "Which operation removes an element from a stack?", options: ["Push", "Pop", "Enqueue", "Dequeue"], answer: 1 },
            { q: "What is a queue?", options: ["A linear data structure based on FIFO", "A hierarchical data structure", "A database table", "A sorting algorithm"], answer: 0 },
            { q: "The process of accessing each element in an array is called:", options: ["Sorting", "Merging", "Traversal", "Insertion"], answer: 2 }
        ]
    ],
    Intermediate: [
        [
            { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"], answer: 1 },
            { q: "Which tree traversal visits the root node first?", options: ["In-order", "Pre-order", "Post-order", "Level-order"], answer: 1 },
            { q: "What data structure is best for implementing a priority queue?", options: ["Array", "Linked List", "Heap", "Stack"], answer: 2 },
            { q: "Which algorithm uses 'divide and conquer' to sort an array?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], answer: 2 },
            { q: "In a binary search tree, where are elements smaller than the root placed?", options: ["To the right", "At the bottom level", "To the left", "Randomly"], answer: 2 },
            { q: "What is the time complexity of inserting into a max-heap?", options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"], answer: 2 },
            { q: "Which graph representation is best for dense graphs?", options: ["Adjacency List", "Adjacency Matrix", "Edge List", "Incidence Matrix"], answer: 1 },
            { q: "What condition must be met for binary search to work?", options: ["Array must be empty", "Array must be unsorted", "Array must be sorted", "Array must contain only integers"], answer: 2 },
            { q: "What is a hash collision?", options: ["When two keys map to the same index", "When two tables intersect", "When a hash function fails", "When a bucket is missing"], answer: 0 },
            { q: "Which sorting algorithm is generally considered the fastest for large datasets?", options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"], answer: 1 }
        ],
        [
            { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"], answer: 1 },
            { q: "Which tree traversal visits the root node first?", options: ["In-order", "Pre-order", "Post-order", "Level-order"], answer: 1 },
            { q: "What data structure is best for implementing a priority queue?", options: ["Array", "Linked List", "Heap", "Stack"], answer: 2 },
            { q: "Which algorithm uses 'divide and conquer' to sort an array?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], answer: 2 },
            { q: "In a binary search tree, where are elements smaller than the root placed?", options: ["To the right", "At the bottom level", "To the left", "Randomly"], answer: 2 },
            { q: "What is the time complexity of inserting into a max-heap?", options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"], answer: 2 },
            { q: "Which graph representation is best for dense graphs?", options: ["Adjacency List", "Adjacency Matrix", "Edge List", "Incidence Matrix"], answer: 1 },
            { q: "What condition must be met for binary search to work?", options: ["Array must be empty", "Array must be unsorted", "Array must be sorted", "Array must contain only integers"], answer: 2 },
            { q: "What is a hash collision?", options: ["When two keys map to the same index", "When two tables intersect", "When a hash function fails", "When a bucket is missing"], answer: 0 },
            { q: "Which sorting algorithm is generally considered the fastest for large datasets?", options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"], answer: 1 }
        ],
        [
            { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"], answer: 1 },
            { q: "Which tree traversal visits the root node first?", options: ["In-order", "Pre-order", "Post-order", "Level-order"], answer: 1 },
            { q: "What data structure is best for implementing a priority queue?", options: ["Array", "Linked List", "Heap", "Stack"], answer: 2 },
            { q: "Which algorithm uses 'divide and conquer' to sort an array?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], answer: 2 },
            { q: "In a binary search tree, where are elements smaller than the root placed?", options: ["To the right", "At the bottom level", "To the left", "Randomly"], answer: 2 },
            { q: "What is the time complexity of inserting into a max-heap?", options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"], answer: 2 },
            { q: "Which graph representation is best for dense graphs?", options: ["Adjacency List", "Adjacency Matrix", "Edge List", "Incidence Matrix"], answer: 1 },
            { q: "What condition must be met for binary search to work?", options: ["Array must be empty", "Array must be unsorted", "Array must be sorted", "Array must contain only integers"], answer: 2 },
            { q: "What is a hash collision?", options: ["When two keys map to the same index", "When two tables intersect", "When a hash function fails", "When a bucket is missing"], answer: 0 },
            { q: "Which sorting algorithm is generally considered the fastest for large datasets?", options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"], answer: 1 }
        ],
        [
            { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"], answer: 1 },
            { q: "Which tree traversal visits the root node first?", options: ["In-order", "Pre-order", "Post-order", "Level-order"], answer: 1 },
            { q: "What data structure is best for implementing a priority queue?", options: ["Array", "Linked List", "Heap", "Stack"], answer: 2 },
            { q: "Which algorithm uses 'divide and conquer' to sort an array?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], answer: 2 },
            { q: "In a binary search tree, where are elements smaller than the root placed?", options: ["To the right", "At the bottom level", "To the left", "Randomly"], answer: 2 },
            { q: "What is the time complexity of inserting into a max-heap?", options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"], answer: 2 },
            { q: "Which graph representation is best for dense graphs?", options: ["Adjacency List", "Adjacency Matrix", "Edge List", "Incidence Matrix"], answer: 1 },
            { q: "What condition must be met for binary search to work?", options: ["Array must be empty", "Array must be unsorted", "Array must be sorted", "Array must contain only integers"], answer: 2 },
            { q: "What is a hash collision?", options: ["When two keys map to the same index", "When two tables intersect", "When a hash function fails", "When a bucket is missing"], answer: 0 },
            { q: "Which sorting algorithm is generally considered the fastest for large datasets?", options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"], answer: 1 }
        ],
        [
            { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"], answer: 1 },
            { q: "Which tree traversal visits the root node first?", options: ["In-order", "Pre-order", "Post-order", "Level-order"], answer: 1 },
            { q: "What data structure is best for implementing a priority queue?", options: ["Array", "Linked List", "Heap", "Stack"], answer: 2 },
            { q: "Which algorithm uses 'divide and conquer' to sort an array?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], answer: 2 },
            { q: "In a binary search tree, where are elements smaller than the root placed?", options: ["To the right", "At the bottom level", "To the left", "Randomly"], answer: 2 },
            { q: "What is the time complexity of inserting into a max-heap?", options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"], answer: 2 },
            { q: "Which graph representation is best for dense graphs?", options: ["Adjacency List", "Adjacency Matrix", "Edge List", "Incidence Matrix"], answer: 1 },
            { q: "What condition must be met for binary search to work?", options: ["Array must be empty", "Array must be unsorted", "Array must be sorted", "Array must contain only integers"], answer: 2 },
            { q: "What is a hash collision?", options: ["When two keys map to the same index", "When two tables intersect", "When a hash function fails", "When a bucket is missing"], answer: 0 },
            { q: "Which sorting algorithm is generally considered the fastest for large datasets?", options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"], answer: 1 }
        ]
    ],
    Advanced: [
        [
            { q: "What is the time complexity of searching in an AVL tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 2 },
            { q: "Which algorithm finds the shortest path in a weighted graph with positive edges?", options: ["Kruskal's", "Prim's", "Dijkstra's", "Bellman-Ford"], answer: 2 },
            { q: "What is a B-Tree primarily used for?", options: ["In-memory sorting", "Database indexing", "Pattern matching", "Shortest path finding"], answer: 1 },
            { q: "Which collision resolution technique involves a linked list at each index of a hash table?", options: ["Linear Probing", "Quadratic Probing", "Double Hashing", "Separate Chaining"], answer: 3 },
            { q: "What is the maximum number of edges in a bipartite graph with N vertices?", options: ["N", "N^2 / 4", "N(N-1) / 2", "N^2"], answer: 1 },
            { q: "What property must hold true for a graph to have an Eulerian cycle?", options: ["It must be a tree", "Every vertex must have an even degree", "It must be bipartite", "No cycles can exist"], answer: 1 },
            { q: "Which shortest path algorithm handles negative weight edges?", options: ["Dijkstra's", "Bellman-Ford", "A*", "Prim's"], answer: 1 },
            { q: "What is the time complexity of finding the disjoint set representative using path compression?", options: ["O(1) amortized", "O(n)", "O(log n)", "O(n^2)"], answer: 0 },
            { q: "What kind of data structure forms the basis of the Aho-Corasick algorithm?", options: ["Binary Tree", "Trie", "Hash Table", "Skip List"], answer: 1 },
            { q: "In dynamically checking connectivity in a graph, which structure is optimal?", options: ["Adjacency Matrix", "Segment Tree", "Disjoint Set (Union-Find)", "Binary Heap"], answer: 2 }
        ],
        [
            { q: "What is the time complexity of searching in an AVL tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 2 },
            { q: "Which algorithm finds the shortest path in a weighted graph with positive edges?", options: ["Kruskal's", "Prim's", "Dijkstra's", "Bellman-Ford"], answer: 2 },
            { q: "What is a B-Tree primarily used for?", options: ["In-memory sorting", "Database indexing", "Pattern matching", "Shortest path finding"], answer: 1 },
            { q: "Which collision resolution technique involves a linked list at each index of a hash table?", options: ["Linear Probing", "Quadratic Probing", "Double Hashing", "Separate Chaining"], answer: 3 },
            { q: "What is the maximum number of edges in a bipartite graph with N vertices?", options: ["N", "N^2 / 4", "N(N-1) / 2", "N^2"], answer: 1 },
            { q: "What property must hold true for a graph to have an Eulerian cycle?", options: ["It must be a tree", "Every vertex must have an even degree", "It must be bipartite", "No cycles can exist"], answer: 1 },
            { q: "Which shortest path algorithm handles negative weight edges?", options: ["Dijkstra's", "Bellman-Ford", "A*", "Prim's"], answer: 1 },
            { q: "What is the time complexity of finding the disjoint set representative using path compression?", options: ["O(1) amortized", "O(n)", "O(log n)", "O(n^2)"], answer: 0 },
            { q: "What kind of data structure forms the basis of the Aho-Corasick algorithm?", options: ["Binary Tree", "Trie", "Hash Table", "Skip List"], answer: 1 },
            { q: "In dynamically checking connectivity in a graph, which structure is optimal?", options: ["Adjacency Matrix", "Segment Tree", "Disjoint Set (Union-Find)", "Binary Heap"], answer: 2 }
        ],
        [
            { q: "What is the time complexity of searching in an AVL tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 2 },
            { q: "Which algorithm finds the shortest path in a weighted graph with positive edges?", options: ["Kruskal's", "Prim's", "Dijkstra's", "Bellman-Ford"], answer: 2 },
            { q: "What is a B-Tree primarily used for?", options: ["In-memory sorting", "Database indexing", "Pattern matching", "Shortest path finding"], answer: 1 },
            { q: "Which collision resolution technique involves a linked list at each index of a hash table?", options: ["Linear Probing", "Quadratic Probing", "Double Hashing", "Separate Chaining"], answer: 3 },
            { q: "What is the maximum number of edges in a bipartite graph with N vertices?", options: ["N", "N^2 / 4", "N(N-1) / 2", "N^2"], answer: 1 },
            { q: "What property must hold true for a graph to have an Eulerian cycle?", options: ["It must be a tree", "Every vertex must have an even degree", "It must be bipartite", "No cycles can exist"], answer: 1 },
            { q: "Which shortest path algorithm handles negative weight edges?", options: ["Dijkstra's", "Bellman-Ford", "A*", "Prim's"], answer: 1 },
            { q: "What is the time complexity of finding the disjoint set representative using path compression?", options: ["O(1) amortized", "O(n)", "O(log n)", "O(n^2)"], answer: 0 },
            { q: "What kind of data structure forms the basis of the Aho-Corasick algorithm?", options: ["Binary Tree", "Trie", "Hash Table", "Skip List"], answer: 1 },
            { q: "In dynamically checking connectivity in a graph, which structure is optimal?", options: ["Adjacency Matrix", "Segment Tree", "Disjoint Set (Union-Find)", "Binary Heap"], answer: 2 }
        ],
        [
            { q: "What is the time complexity of searching in an AVL tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 2 },
            { q: "Which algorithm finds the shortest path in a weighted graph with positive edges?", options: ["Kruskal's", "Prim's", "Dijkstra's", "Bellman-Ford"], answer: 2 },
            { q: "What is a B-Tree primarily used for?", options: ["In-memory sorting", "Database indexing", "Pattern matching", "Shortest path finding"], answer: 1 },
            { q: "Which collision resolution technique involves a linked list at each index of a hash table?", options: ["Linear Probing", "Quadratic Probing", "Double Hashing", "Separate Chaining"], answer: 3 },
            { q: "What is the maximum number of edges in a bipartite graph with N vertices?", options: ["N", "N^2 / 4", "N(N-1) / 2", "N^2"], answer: 1 },
            { q: "What property must hold true for a graph to have an Eulerian cycle?", options: ["It must be a tree", "Every vertex must have an even degree", "It must be bipartite", "No cycles can exist"], answer: 1 },
            { q: "Which shortest path algorithm handles negative weight edges?", options: ["Dijkstra's", "Bellman-Ford", "A*", "Prim's"], answer: 1 },
            { q: "What is the time complexity of finding the disjoint set representative using path compression?", options: ["O(1) amortized", "O(n)", "O(log n)", "O(n^2)"], answer: 0 },
            { q: "What kind of data structure forms the basis of the Aho-Corasick algorithm?", options: ["Binary Tree", "Trie", "Hash Table", "Skip List"], answer: 1 },
            { q: "In dynamically checking connectivity in a graph, which structure is optimal?", options: ["Adjacency Matrix", "Segment Tree", "Disjoint Set (Union-Find)", "Binary Heap"], answer: 2 }
        ],
        [
            { q: "What is the time complexity of searching in an AVL tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 2 },
            { q: "Which algorithm finds the shortest path in a weighted graph with positive edges?", options: ["Kruskal's", "Prim's", "Dijkstra's", "Bellman-Ford"], answer: 2 },
            { q: "What is a B-Tree primarily used for?", options: ["In-memory sorting", "Database indexing", "Pattern matching", "Shortest path finding"], answer: 1 },
            { q: "Which collision resolution technique involves a linked list at each index of a hash table?", options: ["Linear Probing", "Quadratic Probing", "Double Hashing", "Separate Chaining"], answer: 3 },
            { q: "What is the maximum number of edges in a bipartite graph with N vertices?", options: ["N", "N^2 / 4", "N(N-1) / 2", "N^2"], answer: 1 },
            { q: "What property must hold true for a graph to have an Eulerian cycle?", options: ["It must be a tree", "Every vertex must have an even degree", "It must be bipartite", "No cycles can exist"], answer: 1 },
            { q: "Which shortest path algorithm handles negative weight edges?", options: ["Dijkstra's", "Bellman-Ford", "A*", "Prim's"], answer: 1 },
            { q: "What is the time complexity of finding the disjoint set representative using path compression?", options: ["O(1) amortized", "O(n)", "O(log n)", "O(n^2)"], answer: 0 },
            { q: "What kind of data structure forms the basis of the Aho-Corasick algorithm?", options: ["Binary Tree", "Trie", "Hash Table", "Skip List"], answer: 1 },
            { q: "In dynamically checking connectivity in a graph, which structure is optimal?", options: ["Adjacency Matrix", "Segment Tree", "Disjoint Set (Union-Find)", "Binary Heap"], answer: 2 }
        ]
    ],
    "Competitive Battles": [
        [
            { q: "What is the optimal algorithm to find the Longest Palindromic Substring?", options: ["Naive Approach", "Dynamic Programming", "Manacher's Algorithm", "KMP Algorithm"], answer: 2 },
            { q: "Which algorithm optimally solves the Maximum Bipartite Matching problem?", options: ["Dijkstra's", "Hopcroft-Karp", "Floyd-Warshall", "A* Algorithm"], answer: 1 },
            { q: "What is the time complexity of the Floyd-Warshall algorithm?", options: ["O(V^3)", "O(V^2 log V)", "O(E log V)", "O(V^2)"], answer: 0 },
            { q: "Which data structure provides O(log N) time complexity for range sum queries and point updates?", options: ["Segment Tree", "Standard Array", "Linked List", "Binary Search Tree"], answer: 0 },
            { q: "What algorithm string matching in linear time?", options: ["Brute Force", "Floyd-Warshall", "KMP Algorithm", "Prim's Algorithm"], answer: 2 },
            { q: "What is the prefix sum array used for?", options: ["Sorting", "Fast point updates", "Fast range sum queries", "Tree traversal"], answer: 2 },
            { q: "Which algorithm finds the Lowest Common Ancestor (LCA) in O(1) time after prep?", options: ["Euler Tour + RMQ", "Binary Lifting", "Dijkstra's", "BFS"], answer: 0 },
            { q: "In game theory, what does the Sprague-Grundy theorem calculate?", options: ["Nim-value", "Nash Equilibrium", "Minimax", "Shortest path"], answer: 0 },
            { q: "Which algorithm computes the discrete logarithm?", options: ["Euclidean Algorithm", "Sieve of Eratosthenes", "Baby-step giant-step", "Fast Fourier Transform"], answer: 2 },
            { q: "What is the time complexity of multiplying two N-degree polynomials using FFT?", options: ["O(N^2)", "O(N log N)", "O(N)", "O(log N)"], answer: 1 }
        ],
        [
            { q: "What is the optimal algorithm to find the Longest Palindromic Substring?", options: ["Naive Approach", "Dynamic Programming", "Manacher's Algorithm", "KMP Algorithm"], answer: 2 },
            { q: "Which algorithm optimally solves the Maximum Bipartite Matching problem?", options: ["Dijkstra's", "Hopcroft-Karp", "Floyd-Warshall", "A* Algorithm"], answer: 1 },
            { q: "What is the time complexity of the Floyd-Warshall algorithm?", options: ["O(V^3)", "O(V^2 log V)", "O(E log V)", "O(V^2)"], answer: 0 },
            { q: "Which data structure provides O(log N) time complexity for range sum queries and point updates?", options: ["Segment Tree", "Standard Array", "Linked List", "Binary Search Tree"], answer: 0 },
            { q: "What algorithm string matching in linear time?", options: ["Brute Force", "Floyd-Warshall", "KMP Algorithm", "Prim's Algorithm"], answer: 2 },
            { q: "What is the prefix sum array used for?", options: ["Sorting", "Fast point updates", "Fast range sum queries", "Tree traversal"], answer: 2 },
            { q: "Which algorithm finds the Lowest Common Ancestor (LCA) in O(1) time after prep?", options: ["Euler Tour + RMQ", "Binary Lifting", "Dijkstra's", "BFS"], answer: 0 },
            { q: "In game theory, what does the Sprague-Grundy theorem calculate?", options: ["Nim-value", "Nash Equilibrium", "Minimax", "Shortest path"], answer: 0 },
            { q: "Which algorithm computes the discrete logarithm?", options: ["Euclidean Algorithm", "Sieve of Eratosthenes", "Baby-step giant-step", "Fast Fourier Transform"], answer: 2 },
            { q: "What is the time complexity of multiplying two N-degree polynomials using FFT?", options: ["O(N^2)", "O(N log N)", "O(N)", "O(log N)"], answer: 1 }
        ],
        [
            { q: "What is the optimal algorithm to find the Longest Palindromic Substring?", options: ["Naive Approach", "Dynamic Programming", "Manacher's Algorithm", "KMP Algorithm"], answer: 2 },
            { q: "Which algorithm optimally solves the Maximum Bipartite Matching problem?", options: ["Dijkstra's", "Hopcroft-Karp", "Floyd-Warshall", "A* Algorithm"], answer: 1 },
            { q: "What is the time complexity of the Floyd-Warshall algorithm?", options: ["O(V^3)", "O(V^2 log V)", "O(E log V)", "O(V^2)"], answer: 0 },
            { q: "Which data structure provides O(log N) time complexity for range sum queries and point updates?", options: ["Segment Tree", "Standard Array", "Linked List", "Binary Search Tree"], answer: 0 },
            { q: "What algorithm string matching in linear time?", options: ["Brute Force", "Floyd-Warshall", "KMP Algorithm", "Prim's Algorithm"], answer: 2 },
            { q: "What is the prefix sum array used for?", options: ["Sorting", "Fast point updates", "Fast range sum queries", "Tree traversal"], answer: 2 },
            { q: "Which algorithm finds the Lowest Common Ancestor (LCA) in O(1) time after prep?", options: ["Euler Tour + RMQ", "Binary Lifting", "Dijkstra's", "BFS"], answer: 0 },
            { q: "In game theory, what does the Sprague-Grundy theorem calculate?", options: ["Nim-value", "Nash Equilibrium", "Minimax", "Shortest path"], answer: 0 },
            { q: "Which algorithm computes the discrete logarithm?", options: ["Euclidean Algorithm", "Sieve of Eratosthenes", "Baby-step giant-step", "Fast Fourier Transform"], answer: 2 },
            { q: "What is the time complexity of multiplying two N-degree polynomials using FFT?", options: ["O(N^2)", "O(N log N)", "O(N)", "O(log N)"], answer: 1 }
        ],
        [
            { q: "What is the optimal algorithm to find the Longest Palindromic Substring?", options: ["Naive Approach", "Dynamic Programming", "Manacher's Algorithm", "KMP Algorithm"], answer: 2 },
            { q: "Which algorithm optimally solves the Maximum Bipartite Matching problem?", options: ["Dijkstra's", "Hopcroft-Karp", "Floyd-Warshall", "A* Algorithm"], answer: 1 },
            { q: "What is the time complexity of the Floyd-Warshall algorithm?", options: ["O(V^3)", "O(V^2 log V)", "O(E log V)", "O(V^2)"], answer: 0 },
            { q: "Which data structure provides O(log N) time complexity for range sum queries and point updates?", options: ["Segment Tree", "Standard Array", "Linked List", "Binary Search Tree"], answer: 0 },
            { q: "What algorithm string matching in linear time?", options: ["Brute Force", "Floyd-Warshall", "KMP Algorithm", "Prim's Algorithm"], answer: 2 },
            { q: "What is the prefix sum array used for?", options: ["Sorting", "Fast point updates", "Fast range sum queries", "Tree traversal"], answer: 2 },
            { q: "Which algorithm finds the Lowest Common Ancestor (LCA) in O(1) time after prep?", options: ["Euler Tour + RMQ", "Binary Lifting", "Dijkstra's", "BFS"], answer: 0 },
            { q: "In game theory, what does the Sprague-Grundy theorem calculate?", options: ["Nim-value", "Nash Equilibrium", "Minimax", "Shortest path"], answer: 0 },
            { q: "Which algorithm computes the discrete logarithm?", options: ["Euclidean Algorithm", "Sieve of Eratosthenes", "Baby-step giant-step", "Fast Fourier Transform"], answer: 2 },
            { q: "What is the time complexity of multiplying two N-degree polynomials using FFT?", options: ["O(N^2)", "O(N log N)", "O(N)", "O(log N)"], answer: 1 }
        ],
        [
            { q: "What is the optimal algorithm to find the Longest Palindromic Substring?", options: ["Naive Approach", "Dynamic Programming", "Manacher's Algorithm", "KMP Algorithm"], answer: 2 },
            { q: "Which algorithm optimally solves the Maximum Bipartite Matching problem?", options: ["Dijkstra's", "Hopcroft-Karp", "Floyd-Warshall", "A* Algorithm"], answer: 1 },
            { q: "What is the time complexity of the Floyd-Warshall algorithm?", options: ["O(V^3)", "O(V^2 log V)", "O(E log V)", "O(V^2)"], answer: 0 },
            { q: "Which data structure provides O(log N) time complexity for range sum queries and point updates?", options: ["Segment Tree", "Standard Array", "Linked List", "Binary Search Tree"], answer: 0 },
            { q: "What algorithm string matching in linear time?", options: ["Brute Force", "Floyd-Warshall", "KMP Algorithm", "Prim's Algorithm"], answer: 2 },
            { q: "What is the prefix sum array used for?", options: ["Sorting", "Fast point updates", "Fast range sum queries", "Tree traversal"], answer: 2 },
            { q: "Which algorithm finds the Lowest Common Ancestor (LCA) in O(1) time after prep?", options: ["Euler Tour + RMQ", "Binary Lifting", "Dijkstra's", "BFS"], answer: 0 },
            { q: "In game theory, what does the Sprague-Grundy theorem calculate?", options: ["Nim-value", "Nash Equilibrium", "Minimax", "Shortest path"], answer: 0 },
            { q: "Which algorithm computes the discrete logarithm?", options: ["Euclidean Algorithm", "Sieve of Eratosthenes", "Baby-step giant-step", "Fast Fourier Transform"], answer: 2 },
            { q: "What is the time complexity of multiplying two N-degree polynomials using FFT?", options: ["O(N^2)", "O(N log N)", "O(N)", "O(log N)"], answer: 1 }
        ]
    ]
};
