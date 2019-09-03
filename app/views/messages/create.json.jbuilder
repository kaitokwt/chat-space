json.id @message.id
json.body @message.body
json.image @message.image.url
json.data @message.created_at.in_time_zone('Tokyo').strftime('%Y/%m/%d(%a) %T')
json.user_name @message.user.name