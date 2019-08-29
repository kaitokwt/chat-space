require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      example 'bodyがあれば保存できる' do
        expect(build(:message, image: nil)).to be_valid
      end

      example '画像があれば保存できる' do
        expect(build(:message, body: nil)).to be_valid
      end

      example 'bodyと画像があれば保存できる' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can`t save' do
      example 'bodyも画像もなければ保存できない' do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include('を入力してください')
      end

      example 'gorup_idがないと保存できない' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      example 'user_idがないと保存できない' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end