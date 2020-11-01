import json


with open('./test.json', 'r'  ) as json_file:
        global data
        data = json.load(json_file)
while True:
    print(""" 
Dosya üzerinde hangi işlemi yapmak istiyorsunuz
1 - Update
2 - Add
3 - Delete
q - Kaydet ve çık
""")
    process_numb = input("İşlem no giriniz: ")
    

    if process_numb == "q":
        with open('./test.json', "w") as outfile: 
            outfile.write(json.dumps(data, indent = 4))
        print(data) 
        break
    if process_numb == "1":
        print(data.keys())
        channel_name = input("Kanal adını giriniz: ").lower()
        print(data[channel_name]["keywords"])
        keyword_name = input("Keyword giriniz (Çıkış için q ya basınız): ").lower()
        while keyword_name != "q":
            if keyword_name in data[channel_name]["keywords"]:                      
                print("Bu keyword zaten var!")          
            else:
                data[channel_name]["keywords"].append(keyword_name)
                print(data[channel_name]["keywords"])
                        
            keyword_name = input("Keyword giriniz (Çıkış için q ya basınız): ").lower()
            
        
    if process_numb == "2":
        print(data.keys())
        channel_name = input("Eklemek istediğiniz kanal adını giriniz (Çıkış için q ya basınız): ").lower()
        while channel_name != "q":
            if channel_name in data.keys():                      
                print("Bu kanal zaten var!")          
            else:
                data[channel_name] = {}
                print(data.keys())
                channel_id = input("Kanal ID'sini giriniz: ")
                data[channel_name]["channel_id"] = channel_id
                data[channel_name]["keywords"] = []          
                print("Kanal başarıyla oluşturuldu.")
                

            channel_name = input("Eklemek istediğiniz kanal adını giriniz (Çıkış için q ya basınız): ").lower()

    if process_numb == "3":
        delete = input("""Kanal mı Silmek istiyorsunuz, yoksa Keyword mu?
        Kanal için    - k harfi
        Keywords için - kw harfleri 
        yazınız
        : 
        """)
        if delete == "k":
            print(data.keys())
            delete_channel = input("Silmek istediğiniz Kanal adını giriniz: ")
            delete_channel2 = input("""BU KARARDAN EMIN MISINIZ?
            EVET ISE - E HARFI
            HAYIR ISE - H HARFI
            """)
            if delete_channel2 == "E":
                data.pop(delete_channel)
            else:
                pass

        if delete == "kw":
            print(data.keys())
            delete_keywords_channel = input("Keywordu silmek istediginiz kanal adınız giriniz: ")
            if delete_keywords_channel in data.keys():
                print(data[delete_keywords_channel]["keywords"])
                delete_keywords = input("Silmek istediğiniz keywordsu giriniz: ")
                
                while delete_keywords != "q":                                                             
                    if delete_keywords in data[delete_keywords_channel]["keywords"]:
                        data[delete_keywords_channel]["keywords"].remove(delete_keywords)
                        print(data[delete_keywords_channel]["keywords"])
                    else:
                        print("Böyle bir keyword zaten bulunmamaktadır.")
                    delete_keywords = input("Silmek istediğiniz keywordsu giriniz (Çıkış için q ya basınız): ")

            
# with open('C:/Users/mehme/Desktop/bot/test.json', 'r'  ) as json_file:
#     global data
#     data = json.load(json_file)
# with open('C:/Users/mehme/Desktop/bot/test.json', 'w'  ) as json_file:

#     print("Var olan kanal adları şunlardır: ", data.keys())
#     channel_name = input("Kanal adını giriniz: ").lower()
#     data[channel_name] = ""
#     print(data.keys())
#     json_file.write(json.dumps(data, indent = 4))
    
