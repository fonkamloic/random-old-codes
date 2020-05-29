/* Name: insertNode.c
 * Purpose: inserts node in linked list
 * Date Implemented: 13-08-2017
 */

#include <stdio.h>
#include <stdlib.h>

//struct of node
typedef struct node 
{
    int data;
    struct node* next;
}node;

//global head variable
node* head = NULL;

int main(void)
{
    int number;
    char* end = " ";
    char* stop = "DONE";
    while(!strcmp(end, stop ))
    {
        printf("Give a number to be added to linked list(Type \"DONE\" when you are done: ");
        number = getchar();
        if(!(isalnum(number)))
        {
            scanf("%s", &end);
        }
        else
        {
            insert(number);
            print();
            printf("Please enter another number to be inserted: ");
            scanf("%d", &number);
            printf("At what position should it be inserted?: ");
            int position;
            scanf("%d", &position);
            insertAt(number, position);
        }
    }
}

//prototype definition

//delete definition

void delete(int x)
{
    node* temp = head;
    if(x== 1)
    {
        head = temp->next;
        free(temp);
        return;
    }
    for(int i = 0; i < x - 2; i++)
    {
        temp = temp->next;
    }
    node* temp1 = temp->next;
    temp->next = temp1->next;
    free(temp1);
}

//print definition
void print(void)
{
    node* temp = head;
    printf("The list is: ");
    while(temp->next != NULL)
    {
        printf("%d ", temp->data);
    }
    printf("\n");
}

//add definition
void add(int x)
{
    node* temp = (node*)malloc(sizeof(node));
    temp->data = x;
    temp->next = NULL;
    if(head = NULL)
    {
        head = temp;
        return;
    }
    node* temp1 = head;
    while(temp1->next != NULL)
    {
        temp1 = temp1->next;
    }
    temp1 = temp;
}


//insertAt definition

void insertAt(int x , int n)
{
    node* temp = head;
    if(head == NULL)
    {
        node* temp1 = (node*)malloc(sizeof(node));
        temp1->data = x;
        temp1->next = NULL;
        head = temp1;
        return;
    }
    for(int i = 0; i < n - 2; i++)
    {
        temp
    }
}