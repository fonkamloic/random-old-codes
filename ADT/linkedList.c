/* Name: linkedList.c
 * Purpose: a linked list data structure
 * Date Implemented: 13-07-2017
 */

#include <stdio.h>
#include <stdlib.h>

//prototypes 
void insert(int a);
void print(void);

//struct data type use to create linked list
typedef struct node
{
    int data;
    struct node* next;
}node;

//This is the head node of my linked list
node* head = NULL;

int main(void)
{

    printf("How many numbers are to be entered?: ");
    int listSize, number;
    scanf("%d", &listSize);
    for(int i = 0; i < listSize; i++)
    {
        printf("Enter a number: ");
        scanf("%d", &number);
        insert(number);
        print();
    }
}


//prototypes definition

//insert funtion definition
void insert(int a)
{
    node* temp = (node*)malloc(sizeof(node));
    (*temp).data = a;
    (*temp).next = head;
    head = temp;
}

//print function definition
void print(void)
{
    node* temp = head;
    printf("The list is: ");
    while(temp != NULL)
    {
        printf("%d ", temp -> data);
        temp = temp -> next;
    }
    printf("\n");
}