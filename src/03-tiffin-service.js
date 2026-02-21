/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  if (!name || name === "") return null;
  else if (mealType === "veg")
    return { name, mealType, days, dailyRate: 80, totalCost: 80 * days };
  else if (mealType === "nonveg")
    return { name, mealType, days, dailyRate: 120, totalCost: 120 * days };
  else if (mealType === "jain")
    return { name, mealType, days, dailyRate: 90, totalCost: 90 * days };
  else return null;
}

export function combinePlans(...plans) {
  if (plans.length === 0) return null;
  let totalRevenue = 0;
  let vegCount = 0;
  let nonvegCount = 0;
  let jainCount = 0;
  for (let plan of plans) {
    totalRevenue += plan.totalCost;
    if (plan.mealType === "veg") vegCount++;
    else if (plan.mealType === "nonveg") nonvegCount++;
    else if (plan.mealType === "jain") jainCount++;
  }
  const mealBreakdown = { veg: vegCount, nonveg: nonvegCount, jain: jainCount };
  return { totalCustomers: plans.length, totalRevenue, mealBreakdown };
}

export function applyAddons(plan, ...addons) {
  if (!plan) return null;
  let newPlan = structuredClone(plan);
  let addonNames = [];
  for (let addon of addons) {
    newPlan.dailyRate += addon.price;
    addonNames.push(addon.name);
  }
  newPlan.totalCost = newPlan.dailyRate * newPlan.days;
  return { ...newPlan, addonNames };
}
