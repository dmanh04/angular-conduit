import { ComponentStore, OnStoreInit } from "@ngrx/component-store";
import { FormStatus } from "../shared/constants";
import { inject } from "@angular/core";
import { UserService } from "../shared/services";



interface LoginFormState{
    status: FormStatus;
}

export class LoginStore extends ComponentStore<LoginFormState>{

    readonly #userService = inject(UserService);

    // ngrxOnStoreInit(){
    //     this.setState({
    //         status: 'idle'
    //     })
    // };

   
   

}