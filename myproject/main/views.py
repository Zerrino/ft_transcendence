from django.shortcuts import render

def index(request):
    return render(request, 'main/index.html')

def second(request):
    return render(request, 'main/second_page.html')

def pong(request):
    return render(request, 'main/pong.html')

# Create your views here.
