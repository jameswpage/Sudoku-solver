# -*- coding: utf-8 -*-
"""
Created on Mon Nov  6 15:39:27 2017

@author: James Page
"""



import cv2
import imutils
import numpy as np




def assignLetters():
    im = cv2.imread('C:\\Users\\James Page.JamesPage-THINK\\Anaconda3\\envs\\cvpath\\project_folder\\sudoku\\nums.jpg')
    
    gray = cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray,(5,5),0)
    thresh = cv2.adaptiveThreshold(blur,255,1,1,11,2)
    
    
    
    #################      Now finding Contours         ###################
    
    cnts = cv2.findContours(thresh,cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if imutils.is_cv2() else cnts[1]
    
    samples =  np.empty((0,100))
    responses = []
    keys = [i for i in range(1,10)]

    
    for cnt in cnts:
   
        if cv2.contourArea(cnt)>50:
            [x,y,w,h] = cv2.boundingRect(cnt)
    
            if  h>28:
                cv2.rectangle(im,(x,y),(x+w,y+h),(0,0,255),2)
                roi = thresh[y:y+h,x:x+w]
                roismall = cv2.resize(roi,(10,10))
                key = int(input())
                
                if key == 27:  # (escape to quit)
                    break
                elif key in keys:
                    responses.append(key)
                    sample = roismall.reshape((1,100))
                    samples = np.append(samples,sample,0)

    
    responses = np.array(responses,np.float32)
    responses = responses.reshape((responses.size,1))
    print("training complete")

    np.savetxt('generalsamples.data',samples)
    np.savetxt('generalresponses.data',responses)
    

def train(file):
    img = cv2.imdecode(np.fromstring(file.read(),np.uint8), cv2.IMREAD_UNCHANGED)
    #######   training part    ############### 
    samples = np.loadtxt('generalsamples.data',np.float32)
    responses = np.loadtxt('generalresponses.data',np.float32)
    responses = responses.reshape((responses.size,1))
    
    model = cv2.ml.KNearest_create()
    model.train(samples,cv2.ml.ROW_SAMPLE, responses)
    
    ############################# testing part  #########################
    
    #img = cv2.imread('C:\\Users\\James Page.JamesPage-THINK\\Anaconda3\\envs\\cvpath\\project_folder\\sudoku\\p6.jpg')
    
    #create output image with same shape
    out = np.zeros(img.shape,np.uint8)
    
    #determine approximate max and min areas of numbers in puzzle 
    #in the fucture I will move these toa function
    height = len(img)
    width = len(img[0])
    max_con_ar = (height*width/81)*.8
    
    puz = [[0]*9 for i in range(9)]
    
    
    #convert image to gray, flip its colors, then convert to black and white
    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    thresh = cv2.adaptiveThreshold(gray,255,1,1,11,2)
    (thresh, im_bw) = cv2.threshold(thresh, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    

    #find contours, RETR list means ALL contours are returned
    cnts = cv2.findContours(im_bw.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    
    #contours are the second argument returned by findContours
    cnts = cnts[0] if imutils.is_cv2() else cnts[1]
    
    for cnt in cnts:
        (x, y, w, h) = cv2.boundingRect(cnt)
        
        height_thresh = .4
        if (w*h < max_con_ar and (h > height/9*height_thresh)):
            row = int(y/(height/9))
            col = int(x/(width/9))
            #cv2.rectangle(img, (x,y), (x+w, y+h), (0,255,0), 3)
            roi = im_bw[y:y+h,x:x+w]
            roismall = cv2.resize(roi,(10,10))
            roismall = roismall.reshape((1,100))
            roismall = np.float32(roismall)
            retval, results, neigh_resp, dists = model.findNearest(roismall, k = 1)
            num = int((results[0][0]))
        
            puz[row][col] = num
            string = str(num)
            cv2.putText(out,string,(x,y+h),0,1,(0,255,0))
    
    return puz
            



