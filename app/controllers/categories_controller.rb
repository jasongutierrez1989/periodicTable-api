class CategoriesController < ApplicationController

  def index
    categories = Category.all
    render json: categories
  end

  def show
    category = Category.find_by(id: params[:id])
    num = []
    for i in category.elements do
      num << i.atomic_number
    end
    render json: num
  end

end
