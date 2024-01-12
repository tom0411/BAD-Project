from sanic import Sanic
from sanic.response import json
import joblib
import math
app = Sanic("App_Name")

# Load the model from the file
loaded_regressor = joblib.load('knn_regressor_model.pkl')


@app.route("/")
def test(request):
    new_data = [[0, 27,75.3,0]]  # Isweekend, Temperature, Rainfall, Holiday

    # Normalize and make a prediction using the trained model
    predicted_demand = loaded_regressor.predict(new_data)
    rounded_demand = math.floor(predicted_demand[0])

    print(rounded_demand)

    return json({"Predicted demand": rounded_demand})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, single_process=True)