import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path:'', component: AppComponent },
    {path:'', redirectTo: 'home', pathMatch: 'full' },  // Redirect to home page if no path is provided
    {path:'home', component: HomeComponent },
    {path:'list', component: ListComponent},
    {path:'add', component: AddComponent},
    {path:'login', component: LoginComponent},
];
