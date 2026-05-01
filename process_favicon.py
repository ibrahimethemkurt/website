from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Find bounding box of non-light pixels
    min_x, min_y = img.width, img.height
    max_x, max_y = 0, 0
    
    for y in range(img.height):
        for x in range(img.width):
            item = img.getpixel((x, y))
            if not (item[0] > 180 and item[1] > 180 and item[2] > 180):
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y

    # Add a tiny 2px padding
    pad = 2
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(img.width, max_x + pad)
    max_y = min(img.height, max_y + pad)

    img = img.crop((min_x, min_y, max_x, max_y))
    
    datas = img.getdata()
    newData = []
    for item in datas:
        # Transparent for background
        if item[0] > 180 and item[1] > 180 and item[2] > 180:
            newData.append((255, 255, 255, 0))
        else:
            # White for wolf
            newData.append((255, 255, 255, 255))

    img.putdata(newData)
    
    # Calculate aspect ratio
    w, h = img.size
    aspect = w / h
    
    # We want to fit it perfectly in 256x256
    # Create a 256x256 transparent image and paste the resized image in the center
    final_size = 256
    if w > h:
        new_w = final_size
        new_h = int(final_size / aspect)
    else:
        new_h = final_size
        new_w = int(final_size * aspect)
        
    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    final_img = Image.new("RGBA", (final_size, final_size), (255, 255, 255, 0))
    paste_x = (final_size - new_w) // 2
    paste_y = (final_size - new_h) // 2
    final_img.paste(img, (paste_x, paste_y))
    
    final_img.save(output_path, "PNG")

process_image(r'C:\Users\ercan\.gemini\antigravity\brain\661cfef1-bf05-4090-9991-6f753f0eeab4\bozkurt_logo_1777592490846.png', r'C:\Users\ercan\Desktop\Belgeler\İbrahim Ethem\ibrahimethemkurt.com\public\favicon.png')
