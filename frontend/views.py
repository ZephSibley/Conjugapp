from django.shortcuts import render, redirect

def index(request):
    if request.user.is_authenticated:
        return render(request, 'frontend/index.html')
    else: 
        return redirect('accounts/login/')
