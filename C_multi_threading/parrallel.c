#include<stdio.h>
#include<stdlib.h>
#include<pthread.h>

void *sum_running(void *arg); //thread function

//global variable
	long long sum = 0;

int main(int argc, char **argv){
	if(argc < 2){
		printf("Usage: %s <num>\n", argv[0]);
		exit(-1);
	}
	long long limit = atoll(argv[1]);


	//Thread Id
	pthread_t id1;

	//create attrribute

	pthread_attr_t attr;
	pthread_attr_init(&attr);

	//create thread
	pthread_create(&id1, &attr, sum_running, &limit);

	//other work;
	printf("Enter choice: ");
	int chose;
	scanf("%d", &chose);
	if(chose == -1){
		printf("Program stopped by user :)\n");
		return 1;
	}

	//wait for thread to complete
	pthread_join(id1, NULL);

	printf("Sum is %lld\n", sum);
	return 0;
}


void *sum_running(void *arg){
	long long *limit_ptr = (long long*) arg;

	for(long long i = 0; i <= *limit_ptr; i++) {
		sum += i;
	}


	pthread_exit(0);



}

