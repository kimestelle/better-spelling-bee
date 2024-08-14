# import os, random

# def filter_pangrams():
#     file_path = os.path.join(os.path.dirname(__file__), 'data', 'cleaned.txt')
#     pangram_path = os.path.join(os.path.dirname(__file__), 'data', 'pangrams.txt')

#     if not os.path.exists(file_path):
#         print(f"File not found: {file_path}")
#         return None, 0
    
#     with open(file_path, 'r') as w:
#         words = w.readlines()

#     with open(pangram_path, 'a') as f:
#         for word in words:
#             word = word.strip()
#             if is_pangram(word):
#                 f.write(word + "\n")


# def is_pangram(word): 
#     if len(word) > 7:
#         unique_letters = set()
#         for letter in word:
#             if letter not in unique_letters:
#                 unique_letters.add(letter)
#         if len(unique_letters) != 7:
#             return False
#         else:   
#             return True

# filter_pangrams()
