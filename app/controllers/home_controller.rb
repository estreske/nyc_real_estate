class HomeController < ApplicationController

  def index

  end
  def clear
    CSV.open("public/data.csv", "wb") do |csv|
      csv << ["prices"]
    end
  end
  def counts
    year = params[:year]
    q = params[:q]
    type = params[:type]
    borough = params[:borough]
    my_url = "http://api.nytimes.com/svc/real-estate/v2/sales/count.json?geo-extent-level=borough&geo-extent-value=" + borough + "&geo-summary-level=borough&date-range=" + year + "-" + q + "&building-type-id=" + type + "&api-key=1EC54803D22BA64ED89B4EC094FC5DDE:10:68849599"
    result = HTTParty.get(my_url)
    @count = result["results"][0]["count"]
    render json: @count

  end

  def prices
    
    year = params[:year]
    q = params[:q]
    type = params[:type]
    borough = params[:borough]
    percentile = params[:percentile]
    my_url = "http://api.nytimes.com/svc/real-estate/v2/sales/percentile/"+ percentile + ".json?geo-extent-level=borough&geo-extent-value=" + borough + "&geo-summary-level=borough&date-range=" + year + "-" + q + "&building-type-id=" + type + "&api-key=1EC54803D22BA64ED89B4EC094FC5DDE:10:68849599"
    result = HTTParty.get(my_url)
    @price = result["results"][0]["sale_price"].gsub("$", "").gsub(",","").to_f
    render json: { price: @price }
    CSV.open("public/data.csv", "ab") do |csv|
    csv << [@price]
    end
  end
end
