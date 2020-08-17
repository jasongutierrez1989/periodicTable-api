class DetailsController < ApplicationController

  def show
    detail = Detail.find_by(category_id: params[:category_id], element_id: params[:element_id], group_id: params[:group_id], period_id: params[:period_id])
    render json: detail

  end

end
