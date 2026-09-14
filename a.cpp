#include<iostream>
using namespace std;
int linear_search(int x , int length , int arr[])
{
    for (int i = 0; i < length ; i++)
    {
        if(arr[i]==x){
            cout<<"element" <<x <<"found at position "<<i;
            return i;
        }
    }
    cout<<"element not found";
    return -1;
    }


int main(){
    int arr[]={23,45,76,12,4,9,67,56,8};
    int length =sizeof(arr)/sizeof(int);
    linear_search( 9 , length , arr);
    return 0;
}
