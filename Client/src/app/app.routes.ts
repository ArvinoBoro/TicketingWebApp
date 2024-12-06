import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditComponent } from './pages/edit/edit.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {path:'', component: AppComponent },
    {path:'', redirectTo: 'home', pathMatch: 'full' },  // Redirect to home page if no path is provided
    {path:'home', component: HomeComponent },
    {path:'about', component: AboutComponent},
    {path:'contact', component: ContactComponent},
    {path:'tickets', component: ListComponent},
    {path:'tickets/add', component: AddComponent},
    {path:'tickets/edit/:id', component: EditComponent},
    {path:'tickets/delete/:id', component: DeleteComponent},  
    {path:'users/login', component: LoginComponent},
    {path:'users/register', component: RegisterComponent},    
];

