class ElementsController < ApplicationController

  def index
    elements = Element.all
    render json: elements
  end

  def show
    element = Element.find_by(id: params[:id])
    render json: element
  end
  # python -m SimpleHTTPServer

end
