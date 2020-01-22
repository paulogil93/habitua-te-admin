from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout

# Create your views here.

@login_required
def index(request):
    return render(request, 'index.html', {'user': request.user})

@login_required
def users(request):
    return render(request, 'users.html', {})

@login_required
def products(request):
    return render(request, 'products.html', {})

@login_required
def events(request):
    return render(request, 'events.html', {})

@login_required
def news(request):
    return render(request, 'news.html', {})

@login_required
def categories(request):
    return render(request, 'categories.html', {})

@login_required
def notifications(request):
    return render(request, 'notifications.html', {})

def login(request):
    if not request.user.is_authenticated:
        return render(request, 'login.html', {})
    else:
        return redirect('/index/')

def do_login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        auth_login(request, user)
        if request.POST.get('next') is not '':
            return redirect(request.POST.get('next'))
        else:
            return redirect('/index/')
    else:
        return redirect('/login/')

def logout(request):
    auth_logout(request)
    return redirect('/login/')
