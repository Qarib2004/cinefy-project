import Field from "@/components/ui/form-elements/field/Field";
import { IAuthForm } from "@/types/auth.types";
import { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { validEmail } from "./valid-email";





interface IAuthFields{
    register:UseFormRegister<IAuthForm>
    errors:{
        name?:FieldError
        email?:FieldError
        password?:FieldError
    }
    isLoginForm:boolean 
}



const AuthFields : FC<IAuthFields> = ({register,errors,isLoginForm}) => {
    return (
        <>
        {!isLoginForm && (
            <Field
                {...register('name', {
                    required: 'The name is mandatory',
                    minLength: {
                        value: 1,
                        message: 'Please enter a name'
                    }
                })}
                placeholder='Name'
                error={errors.name}
            />
        )}
        <Field
            {...register('email', {
                required: 'Email is reuired',
                pattern: {
                    value: validEmail,
                    message: 'Please enter the correct email'
                }
            })}
            placeholder='Email'
            error={errors.email}
        />
        <Field
            {...register('password', {
                required: 'The password is required',
                minLength: {
                    value: 6,
                    message: 'The password must contain 6 characters'
                }
            })}
            type='password'
            placeholder='Password'
            error={errors.password}
        />
    </>
    )
}



export default AuthFields