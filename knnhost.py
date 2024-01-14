from sanic import Sanic
from sanic.response import json
import joblib
import math

from sanic import Sanic, response

from sanic_cors import CORS, cross_origin

# Load the model from the file
loaded_regressor = joblib.load('knn_regressor_model.pkl')


# @app.route("/")
# def test(request):
#     new_data = [[0, 27,75.3,0]]  # Isweekend, Temperature, Rainfall, Holiday

#     # Normalize and make a prediction using the trained model
#     predicted_demand = loaded_regressor.predict(new_data)
#     rounded_demand = math.floor(predicted_demand[0])

#     print(rounded_demand)

#     return json({"Predicted demand": rounded_demand})

app = Sanic("ProjectionDataReceiver")
CORS(app)

@app.route("/", methods=["POST", "GET"])
async def receive_data(request):
    datas = request.json
    for data in datas:
        print("new_data =", data)
        # You can process the data as needed here
    return response.json({"status": "Data received successfully"})

# def test(request):
#     new_data = [[0, 27,75.3,0]]  # Isweekend, Temperature, Rainfall, Holiday

#     # Normalize and make a prediction using the trained model
#     predicted_demand = loaded_regressor.predict(new_data)
#     rounded_demand = math.floor(predicted_demand[0])

#     print(rounded_demand)

#     return json({"Predicted demand": rounded_demand})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, single_process=True)

