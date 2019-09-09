json.id @message.id
json.(@message, :body)
json.image @message.image.url
json.data @message.created_at.to_s(:ja)
json.user_name @message.user.name