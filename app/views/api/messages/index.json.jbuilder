json.array! @messages do |message|
  json.body message.body
  json.image message.image.url
  json.data message.created_at.to_s(:ja)
  json.user_name message.user.name
  json.id message.id
end