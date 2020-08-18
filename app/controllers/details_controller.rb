class DetailsController < ApplicationController

  def show
    detail = Detail.find_by(category_id: params[:category_id], element_id: params[:element_id], group_id: params[:group_id], period_id: params[:period_id])
    render json: detail
  end

  def update
    detail = Detail.find_by(category_id: params[:category_id], element_id: params[:element_id], group_id: params[:group_id], period_id: params[:period_id])
    detail.update(detail_params)
    render json: detail
  end

  def detail_params
    params.require(:detail).permit(:info)
  end

end
