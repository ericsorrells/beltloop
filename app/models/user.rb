class User < ActiveRecord::Base
  before_save { self.email = email.downcase }
  before_create :create_remember_token 

  #validations
  validates :name,  presence: true, length: { maximum: 50 } 
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(?:\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 254 },
    format: { with: VALID_EMAIL_REGEX }, 
    uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }
  validates :phone, presence: true, length: { is: 10 }
  has_secure_password

  def self.find_user_by_phone_num(number)
    number.to_i
    User.where('phone = ?', number)
  end

  def User.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def User.digest(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  def answered_questions
    self.answers.where.not(content: nil).questions
  end

  private

    def create_remember_token
      self.remember_token = User.digest(User.new_remember_token)
    end
end
