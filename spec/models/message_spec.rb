require 'rails_helper'

describe Message, type: :model do
  describe '#create' do
    context 'can save' do
    
      it "メッセージがあれば保存できる" do
        expect(build(:message, image:  nil)).to be_valid
      end
      
      it "写真があれば保存できる" do
        expect(build(:message, content:  nil)).to be_valid
      end
      
      it "写真とメッセージがあれば保存できる" do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      
      it "写真とメッセージがないと保存できない" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end
      
      it "グループI'dがないと保存できない" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      
      it "ユーザーI'dがないと保存できない" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end