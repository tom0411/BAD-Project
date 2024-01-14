from sanic import Sanic
from sanic.response import json
import joblib
import math
from flask import Flask, request, jsonify
from sanic import Sanic, response
from sanic_cors import CORS, cross_origin
from sanic import HTTPResponse
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
    new_datas = [[data] for data in datas]  # this will nest each data item in its own array
    for new_data in new_datas:
        print("new_data =", new_data)
        # You can process the new_data as needed here
    
    # The return statement should be dedented to be part of the function, not the for loop
    return HTTPResponse(status=200)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, single_process=True)

