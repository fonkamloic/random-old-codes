/* Name: deleteNodeInList.c
 * Purpose: performs all the operation on a singlying linked list
 * Date implemented: 13-08-2017
 */

 #include <stdio.h>
 #include <stdlib.h>
 #include <string.h>
 #include <unistd.h>
 
 //.******structure of each note******
 typedef struct node 
 {
     int data;
     struct node* next;
 }node;
 
 //.*****Global variable****
int listSize = 0, choise;
node* head = NULL;
node* tail = NULL;
 
 //.*********prototypes declaration************
 int menu(void);     // lists list of options available in this program
 int loop(void);     // loops any working part of the program as needed
 void insertBack(int x);    //insert an integer at the end of the list
 void insertFront(int x);  //inserts an integer at the front of the list
 void insertPosition(int x, int positon);   // inserts an integer at a specific point in the list.
 void print();      //prints all elements in the list
 //void reversePrint(node* p_head);   // prints all elements in list in reverse order
 void deleteAtPosition(int x);    // deletes note in node a postition x in the list
 void deleteValue(int value);    //deletes node containing specific value
 
 int main(void)
 {
     int number, clear = 1;
    choise = menu();
    while(choise != 0)
    { 
        if(choise == 1)
        {
            printf("You have choosen insert at the front option\n");
            char done;
            printf("Please enter your list of numbers seperate by commas and end with a period: ");
            scanf(" %d ",&number);
            insertFront(number);
            scanf("%c", &done);
            while(done != '.')
            {
                scanf(" %d ", &number);
                insertFront(number);
                done = getchar();
            }
            printf("\nList successfully update!\n");
        }
        else if(choise == 2)
        {
            printf("You have choosen insert at the end option\n");
            char done;
            printf("Please enter your list of numbers seperate by commas and end with a period: ");
            scanf(" %d ",&number);
            insertBack(number);
            scanf("%c", &done);
            while(done != '.')
            {
                scanf(" %d ", &number);
                insertBack(number);
                done = getchar();
            }
            printf("\nList successfully update!\n");
        }
        else if(choise == 3)
        {
            printf("You have selected the insert at position option\nThat is you give a pair of number (x, y), x is the number to be inserted and y is the position in the list of insertion\n");
            int position;
            char done;
            printf("Please enter your list of pairs of numbers seperate by commas\n and end with a period like:(1,2) ,(2,3). : ");
            scanf("( %d ,%d ) ",&number, &position);
            insertPosition(number, position);
            scanf("%c", &done);
            while(done != '.')
            {
                scanf(" ( %d , %d ) ",&number, &position);
                insertPosition(number, position);
                done = getchar();
            }
            printf("\nList successfully update!\n");
        }
        else if(choise == 4)
        {
            printf("You have choosen the Traverse list option.\n");
            print(head);
        }
        else if(choise == 5)
        {
            printf("You have choosen the reverse traversal option.\n");
            printf("\nSorry Option still in development!!!\n");
        }
        else if(choise == 6)
        {
            printf("You have choosen the delete at specific position option.\n");
            print();
            printf("\nPlease enter the position of the node to be deleted: ");
            int position;
            scanf("%d", &position);
            deleteAtPosition(position);
            print();
        }
        else if(choise == 7)
        {
            printf("You have choosen the delete node of certain value option.\n");
            int value;
            print();
            printf("\nPlease enter the value of the node to be deleted: ");
            scanf("%d", &value);
            deleteValue(value);
            print();
        }
        else if(choise == 8)
        {
            printf("The size of the linked list is %d\n", listSize);
        }
        // //non-sense code use to wait for the user to press any key
        // printf("\nPress any key to continue...");
        // getchar();

        //loop function gives the user control over the termination of the program.
        if(clear % 4 == 0)
        {
            choise = menu();
            clear++;
            continue;
        }
        clear++;
        printf("\n\nPlease enter your choise: ");
        scanf("%d", &choise);
        if(choise != 0 )
        {
            continue;   
        }
    }
    printf("Program terminated by user. Bye!!\n");
    return 0;
 }
 
 //prototype definition
 
 //nenu definition
 int menu(void)
 {
     system("clear");
     printf("\n\n    ***!!!!!!!!!!!!!!!!!!!!~LINKED LIST~!!!!!!!!!!!!!!!!!!!!!!!***\n\
     ***  1-Insert an element at the end of the list.\n\
     ***  2-Insert an element at the end of the list.\n\
     ***  3-Insert an element at a specific position in the list.\n\
     ***  4-Traverse the list content.\n\
     ***  5-Reverse traverse the list.\n\
     ***  6-Delete an element at a specific position in the list.\n\
     ***  7-Delete an element of value given\n\
     ***  8-Print size of linked list\n\
     ***  0-Exit the pogram.\n\
                        **********!!!!!!!!!!!!!!!*********\n\n\
    Please enter your choise: ");
     int choise;
     scanf("%d", &choise);
     if(choise >= 0 && choise <= 8)
         return choise;
     else
     {
         printf("Invalid choise :-(  ...Lets try again\n");
         system("sleep 3s");
         return menu();
     }
 }
 
 // loop definition 
 int loop(void)
 {
     char end;
     printf("\nDo you want to continue using this program?(Y/N): ");
     scanf("%c", &end);
     if(end == 'Y' || end == 'y')
     {
        return menu();
     }
     else
     {
        return 0;
     }
 }
 
 
 //insert definition
 void insertFront(int x)
 {
     node* temp = (node*)malloc(sizeof(node*));
     temp->data = x;
     temp->next = NULL;

     //Case I: If list is empty
     if(head == NULL)
     {
         head = temp;
         tail = temp;
         listSize++;
         return;
     }
     temp->next = head;
     head = temp;
     listSize++;
 }

 //insert definition
 void insertBack(int x)
 {
     node* temp = (node*)malloc(sizeof(node*));
     temp->data = x;
     temp->next = NULL;

     //Case I: If list is empty
     if(head == NULL)
     {
         head = temp;
         tail = temp;
         listSize++;
         return;
     }

     //Case II: If list is not empty
     tail->next = temp;
     tail = temp;
     listSize++;
 }
 
 
 // insertAt definition
 void insertPosition(int x, int position)
 {
     node* temp = (node*)malloc(sizeof(node*));
     temp->data = x;
     temp->next = NULL;

     //Case I: if list is empty
     if(head == NULL)
     {
         head = temp;
         tail = temp;
         return;
         listSize++;
     }

     //Case II: if list is not empty
     node* temp1 = head;
     for(int i = 0; i < position - 2; i++)
     {
         temp1 = temp1->next; //temp1 points at the (n-1)th node
     }
     temp->next = temp1->next; //temp points to the next note after temp1
     temp1->next = temp; //the temp1 points to temp completing the chain
     listSize++;
 }
 
 
 //print definition
 void print()
 {
     //Case I: if list is empty
     if(head == NULL)
     {
        printf("\nThe list is empty!!!\n");
        return;
     }

     //Case II: list contain at least a node.
     node* temp = head;
     printf("The list is: ");
     while(temp != NULL)
     {
         printf("%d ", temp->data);
         temp = temp->next;
     }
 }
 
 
 //deleteAtPosition definition
 void deleteAtPosition(int x)
 {
     node* temp = head;


     //check if the position is a valid one in the list
     if(x >= 1 && x <= listSize)
     {

        //Case I: if the node to delete is the head node 
         if(x == 1)
         {  
             //Subcase I: if list contain just a single node
             if(temp == tail && head == NULL)
             {
                 head = NULL;
                 tail = NULL;
                 free(temp);
                 listSize--;
                 return;
             }

             //SubCase II: if list contain several nodes
             head = head->next; //head points to second node
             free(temp);
             listSize--;
             return;
         }

         //Case II: if node to delete is not the first node
         node* temp1 = head;
         for(int i = 0; i < x - 2; i++)
         {
             temp1 = temp1->next;  //temp1 points to the (n-1)th node
         }
         temp = temp1->next; //temp points to the nth node to be removed
         temp1->next = temp->next; // temp1 point to the next not after temp1
         free(temp);
         listSize--;
     }
     else
     {
         printf("Invalid Position in list.\nPlease use option 8 to see list Size and try again\n");
         return;
     }
 }
 
 // deleteValue definition
 void deleteValue(int value)
 {
     node* temp = head;

     //Case I: list is empty
     if(head == NULL)
     {
         printf("Nothing to delete list is empty\nUse either option 1, 2 or 3 to add element to list\n");
         return;
     }
     //Case II: The first node contains the value
     if(temp->data == value)
     {
         if(temp == tail)
         {
             head = NULL;
             tail = NULL;
             free(temp);
             listSize--;
             return;
         }
         head = head->next;
         free(temp);
         listSize--;
         return;
     }

     //Case III: list contains many nodes 
     node* temp1 = head;
     while(temp1->next != NULL && (temp1->next)->data != value)
     {
         temp1 = temp1->next; 
     }
    //Subcase III: we found the value
    if((temp1->next)->data == value)
    {
        temp = temp1->next;
        temp1->next = temp->next;
        free(temp);
        listSize--;
        return;
    }
    //Subcase IV: we don't find the value
    printf("\nNode with given value not found\nDelete unsuccessfull!:-(\n");
 }